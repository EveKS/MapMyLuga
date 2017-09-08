using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MapMyLuga.Models;
using MapMyLuga.Data;
using Microsoft.AspNetCore.Identity;
using MapMyLuga.Models.Map;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using MapMyLuga.ViewModels;
using Microsoft.AspNetCore.Http;
using System.Globalization;
using MapMyLuga.ViewModels.HomeViewModel;
using System.Text.RegularExpressions;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Controllers.Services.File;

namespace MapMyLuga.Controllers
{
    public class HomeController : Controller
    {
        private ApplicationContext _context;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private IHostingEnvironment _appEnvironment;

        private IFileService _fileService;


        public HomeController(ApplicationContext context,
            SignInManager<User> signInManager, UserManager<User> userManager,
            IHostingEnvironment appEnvironment,
            IFileService fileService)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _context = context;
            _appEnvironment = appEnvironment;

            _fileService = fileService;
        }

        public async Task<ActionResult> Index()
        {
            if (_context != null)
            {
                IQueryable<MarkerGroup> groups = _context.MarkerGroups;
                var groupsList = await groups.OrderBy(n => n.GroupName)
                    .AsNoTracking()
                    .ToListAsync();
                ViewBag.MarkerGroup = groupsList;

                IEnumerable<SelectListItem> selectList =
                    from gr in groups
                    select new SelectListItem
                    {
                        Text = gr.GroupName,
                        Value = gr.MarkerGroupId
                    };

                ViewBag.Groups = selectList;
            }

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Post(MarkerModel model)
        {
            if (ModelState.IsValid)
            {
                IQueryable<Tag> tagQuery = _context.Tags;
                IFormFileCollection uploadedFiles = null;
                FilesModel files = null;
                DateAddObject dateAdd = null;
                List<FileDetail> fileDetailList = null;


                // Thu Apr 27 2017 19:45:48 GMT+0700
                string[] formats = {
                    "ddd MMM d yyyy HH:mm:ss"
                };

                if (model.DataAdd != null)
                {
                    DateTime.TryParseExact(model.DataAdd.Substring(0, 24),
                        formats,
                        CultureInfo.InvariantCulture,
                        DateTimeStyles.None,
                        out var date);

                    if (date != null)
                    {
                        dateAdd = new DateAddObject
                        {
                            Date = date
                        };

                        int length = 24;
                        dateAdd.TimeZone = model.DataAdd
                            .Substring(length, model.DataAdd.Length - length);

                        await _context.DateAddObjects.AddAsync(dateAdd);
                        await _context.SaveChangesAsync();
                    }
                }

                List<TagToMessage> tagToMessages = await GetTags(model.MarkerDescription, tagQuery);

                var tmp = model.MarcerCoordinate
                    .Replace("(", "")
                    .Replace(")", "")
                    .Split(',');

                var user = _userManager.Users.FirstOrDefault(u => u.UserName == model.UserName);

                if (model.UploadedFiles != null)
                {
                    fileDetailList = new List<FileDetail>(model.UploadedFiles.Count);
                    uploadedFiles = await _fileService.UppFiles(model.UploadedFiles, fileDetailList, _appEnvironment);

                    files = new FilesModel()
                    {
                        FileDetails = fileDetailList,
                        DateAddObjectId = dateAdd?.DateAddObjectId
                    };
                    await _context.AddAsync(files);
                    await _context.SaveChangesAsync();
                }

                List<Coordinate> coordinate = new List<Coordinate>()
                {
                    new Coordinate()
                    {
                        Latitude = tmp[0],
                        Longitude = tmp[1]
                    }
                };

                MessageInfo markerMessage = new MessageInfo()
                {
                    Coordinates = coordinate,
                    Title = model.MarkerTitle,
                    Description = model.MarkerDescription,
                    UserId = user?.Id,
                    DateAddObjectId = dateAdd?.DateAddObjectId,
                    ObjectColor = model.ObjectColor,
                    TagToMessage = tagToMessages,
                    IsLine = false
                };

                if (files != null)
                    markerMessage.FilesModelId = files.FilesModelId;

                var group = await _context.MarkerGroups
                    .FirstOrDefaultAsync(gr => gr.MarkerGroupId == model.MarkerGroupId);

                markerMessage.MarkerGroupId = group?.MarkerGroupId;

                await _context.AddAsync(markerMessage);
                await _context.SaveChangesAsync();
                var homeIndexViewModel = new HomeIndexViewModel()
                {
                    ObjectColor = model.ObjectColor,
                    Latitude = tmp[0],
                    Longitude = tmp[1],
                    Title = model.MarkerTitle,
                    MarkerMessageId = markerMessage.MessageInfoId
                };
                return Json(homeIndexViewModel);
            }
            return Json("");
        }

        private async Task<List<TagToMessage>> GetTags(string description, IQueryable<Tag> tagQuery)
        {
            string pattern =
                @"(?<hashtag>(\B|^)(#[\w\d_]+(?!([\w-]))))";
            Regex regex = new Regex(pattern);

            var descriptionTags = regex.Matches(description)
                .OfType<Match>()
                .Select(m =>
                new Tag
                {
                    Name = m.Groups["hashtag"].ToString()
                })
                .Where(t => t.Name.Length > 1)
                .Distinct()
                .ToList();

            var tags = from des in descriptionTags
                       join tag in await tagQuery.ToListAsync()
                          on des.Name.ToLower() equals tag.Name.ToLower() into query
                       from tag in query.DefaultIfEmpty()
                       select tag ?? des
                        into newTag
                       select new TagToMessage { Tag = newTag, TagId = newTag?.TagId };

            //Console.WriteLine(string.Join(Environment.NewLine,
            //    tags.Select(t => $"{t.Tag.Name} {t.TagId}")));

            return tags.ToList();
        }

        private async Task<IFormFileCollection> UppFiles(MarkerModel model, List<FileDetail> fileDetailList)
        {
            IFormFileCollection uploadedFiles = model.UploadedFiles;
            foreach (var uploaded in uploadedFiles)
            {
                if (uploaded != null)
                {
                    //string path = "/Files/" + uploaded.FileName;
                    //using (Stream stream = uploaded.OpenReadStream())
                    //{
                    //    using (var binaryReader = new BinaryReader(stream))
                    //    {                            
                    //        var fileContent = binaryReader.ReadBytes((int)uploaded.Length);
                    //        using (FileStream fs = new FileStream(_appEnvironment.WebRootPath + path, FileMode.Create))
                    //        {
                    //            await fs.WriteAsync(fileContent, 0, fileContent.Length);
                    //        }
                    //    }
                    //}

                    string path = "/Files/" + Path.GetFileName(uploaded.FileName);

                    using (var fileStream = new FileStream(_appEnvironment.WebRootPath + path, FileMode.Create))
                    {
                        await uploaded.CopyToAsync(fileStream);
                    }

                    fileDetailList.Add(new FileDetail
                    {
                        Name = uploaded.FileName,
                        Path = path
                    });
                }
            }

            return uploadedFiles;
        }

        [HttpPost]
        public async Task<IActionResult> SetLine(MarkerModel model)
        {
            if (ModelState.IsValid)
            {
                IQueryable<Tag> tagQuery = _context.Tags;
                IFormFileCollection uploadedFiles = null;
                FilesModel files = null;
                DateAddObject dateAdd = null;
                List<FileDetail> fileDetailList = null;


                // Thu Apr 27 2017 19:45:48 GMT+0700
                string[] formats = {
                    "ddd MMM d yyyy HH:mm:ss"
                };

                DateTime.TryParseExact(model.DataAdd.Substring(0, 24),
                    formats,
                    CultureInfo.InvariantCulture,
                    DateTimeStyles.None,
                    out var date);

                if (date != null)
                {
                    dateAdd = new DateAddObject
                    {
                        Date = date
                    };
                    try
                    {
                        int length = 24;
                        dateAdd.TimeZone = model.DataAdd.Substring(length, model.DataAdd.Length - length);
                    }
                    catch { }
                    await _context.DateAddObjects.AddAsync(dateAdd);
                    await _context.SaveChangesAsync();
                }

                List<TagToMessage> tagToMessages = await GetTags(model.MarkerDescription, tagQuery);

                var split = model.MarcerCoordinate
                    .Replace("(", "")
                    .Replace(")", "")
                    .Split(',');

                List<Coordinate> coordinates = new List<Coordinate>(split.Length / 2);

                for (int i = 0; i < split.Length; i += 2)
                {
                    coordinates.Add(new Coordinate()
                    {
                        CoordinateIndex = i / 2,
                        Latitude = split[i],
                        Longitude = split[i + 1]
                    });
                }


                var user = _userManager.Users.FirstOrDefault(u => u.UserName == model.UserName);

                if (model.UploadedFiles != null)
                {
                    fileDetailList = new List<FileDetail>(model.UploadedFiles.Count);

                    uploadedFiles = model.UploadedFiles;
                    foreach (var uploaded in uploadedFiles)
                    {
                        if (uploaded != null)
                        {
                            string path = "/Files/" + uploaded.FileName;
                            using (var fileStream = new FileStream(_appEnvironment.WebRootPath + path, FileMode.Create))
                            {
                                await uploaded.CopyToAsync(fileStream);
                            }

                            fileDetailList.Add(new FileDetail
                            {
                                Name = uploaded.FileName,
                                Path = path
                            });
                        }
                    }

                    //await _context.FileDetails.AddRangeAsync(fileDetailList);
                    //await _context.SaveChangesAsync();
                    files = new FilesModel()
                    {
                        FileDetails = fileDetailList,
                        DateAddObjectId = dateAdd?.DateAddObjectId
                    };
                    await _context.AddAsync(files);
                    await _context.SaveChangesAsync();
                }

                MessageInfo markerMessage = new MessageInfo()
                {
                    Coordinates = coordinates,
                    Title = model.MarkerTitle,
                    Description = model.MarkerDescription,
                    UserId = user?.Id,
                    DateAddObjectId = dateAdd?.DateAddObjectId,
                    ObjectColor = model.ObjectColor,
                    TagToMessage = tagToMessages,
                    IsLine = true
                };

                if (files != null)
                    markerMessage.FilesModelId = files.FilesModelId;

                var group = await _context.MarkerGroups
                    .FirstOrDefaultAsync(gr => gr.MarkerGroupId == model.MarkerGroupId);

                markerMessage.MarkerGroupId = group?.MarkerGroupId;

                await _context.AddAsync(markerMessage);
                await _context.SaveChangesAsync();

                var homeLineViewModel = new HomeLineViewModel
                {
                    ObjectColor = model.ObjectColor,
                    MessageId = markerMessage.MessageInfoId,
                    Title = markerMessage.Title,
                };

                return Json(homeLineViewModel);
            }
            return Json("");
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }

        [HttpGet]
        public async Task<ActionResult> InfoMapPanel(string markerMessageId)
        {
            if (_context != null && markerMessageId != null)
            {
                var message = await _context.MessageInfos
                    .Include(fl => fl.FilesModel)
                    .Include(gr => gr.MarkerGroup)
                    .Include(dt => dt.DateAddObject)
                    .Include(fd => fd.FilesModel.FileDetails)

                    .FirstOrDefaultAsync(mes => mes.MessageInfoId == markerMessageId);



                if (message != null)
                {
                    MarkerMessageViewModel markerMessageViewModel = new MarkerMessageViewModel()
                    {
                        Title = message.Title,
                        Description = message.Description,
                        GroupName = message.MarkerGroup?.GroupName,
                        DateAdd = message.DateAddObject?.Date.Value.ToString("F"),
                        UserName = message.User?.UserName
                    };

                    if (message.FilesModel?.FileDetails != null)
                    {
                        var images = message.FilesModel.FileDetails;
                        List<string> path = new List<string>(images.Count);
                        foreach (var image in images)
                            path.Add(image.Path);

                        markerMessageViewModel.FilesPath = path;
                    }

                    //ViewBag.MarkerMessageViewModel = markerMessageViewModel;
                    return PartialView("_InfoMapPanel", markerMessageViewModel);
                }
            }

            return PartialView("_InfoMapPanel");
        }

        [HttpPost]
        public async Task<IActionResult> AddMarkers(MenuViewModel data)
        {
            if (_context != null)
            {
                IQueryable<MessageInfo> messages = _context.MessageInfos.Where(mes => !mes.IsLine);

                string[] formats = new[] { "dd.MM.yyyy", "MM/dd/yyyy" };
                if (DateTime.TryParseExact(data.Datepicker, formats, CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime dateTime))
                {
                    messages = messages.Where(d => d.DateAddObject.Date.Value.Date == dateTime.Date);
                }
                else if (DateTime.TryParseExact(data.DatepickerBegin, formats, CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime beginDate)
                    && DateTime.TryParseExact(data.DatepickerEnd, formats, CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime endDate))
                {
                    messages = messages.Where(d => d.DateAddObject.Date.Value.Date >= beginDate.Date
                                                 && d.DateAddObject.Date.Value.Date <= endDate.Date);
                }

                if (!string.IsNullOrWhiteSpace(data.GroupId))
                {
                    messages = messages.Where(g => g.MarkerGroupId == data.GroupId);
                }

                var homeIndexViewModels = await messages.Select(mes => new HomeIndexViewModel
                {
                    ObjectColor = mes.ObjectColor,
                    MarkerMessageId = mes.MessageInfoId,
                    Latitude = mes.Coordinates.First().Latitude,
                    Longitude = mes.Coordinates.First().Longitude,
                    Title = mes.Title
                }).ToListAsync();
                if (homeIndexViewModels.Any())
                    return Json(homeIndexViewModels);
            }

            return Json("");
        }

        [HttpPost]
        public async Task<ActionResult> AddLine(MenuViewModel data)
        {
            if (_context != null)
            {
                IQueryable<MessageInfo> messages = _context.MessageInfos.Where(mes => mes.IsLine);

                string[] formats = new[] { "dd.MM.yyyy", "MM/dd/yyyy" };
                if (DateTime.TryParseExact(data.Datepicker, formats, CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime dateTime))
                {
                    messages = messages.Where(d => d.DateAddObject.Date.Value.Date == dateTime.Date);
                }
                else if (DateTime.TryParseExact(data.DatepickerBegin, formats, CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime beginDate)
                    && DateTime.TryParseExact(data.DatepickerEnd, formats, CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime endDate))
                {
                    messages = messages.Where(d => d.DateAddObject.Date.Value.Date >= beginDate.Date
                                                 && d.DateAddObject.Date.Value.Date <= endDate.Date);
                }

                if (!string.IsNullOrWhiteSpace(data.GroupId))
                {
                    messages = messages.Where(g => g.MarkerGroupId == data.GroupId);
                }

                var homeLineViewModel = await messages.Select(mes => new HomeLineViewModel
                {
                    ObjectColor = mes.ObjectColor,
                    MessageId = mes.MessageInfoId,
                    Title = mes.Title,
                    Coordinates = mes.Coordinates
                                    .OrderBy(coor => coor.CoordinateIndex)
                                    .ToList()
                }).ToListAsync();

                if (homeLineViewModel.Any())
                    return Json(homeLineViewModel);
            }

            return Json("");
        }
    }
}
