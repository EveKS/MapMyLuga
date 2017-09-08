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

namespace MapMyLuga.Controllers
{
    public class HomeController : Controller
    {
        private ApplicationContext _context;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;


        public HomeController(ApplicationContext context,
            SignInManager<User> signInManager, UserManager<User> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _context = context;
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


        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
