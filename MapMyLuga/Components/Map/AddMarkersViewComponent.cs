using MapMyLuga.Data;
using MapMyLuga.Models;
using MapMyLuga.Models.Map;
using MapMyLuga.ViewModels.HomeViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MapMyLuga.Components
{
    public class AddMarkersViewComponent : ViewComponent
    {
        private ApplicationContext _context;

        public AddMarkersViewComponent(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            if (_context != null)
            {
                IQueryable<MessageInfo> message = _context.MessageInfos.Where(mes => !mes.IsLine)
                    .Include(c => c.Coordinates);
                List<HomeIndexViewModel> homeIndexViewModel = new List<HomeIndexViewModel>(50);

                await (message?
                    .AsNoTracking())
                    .ForEachAsync(mes =>
                    {
                        if (mes != null)
                        {
                            homeIndexViewModel.Add(new HomeIndexViewModel
                            {
                                MarkerMessageId = mes.MessageInfoId,
                                ObjectColor = mes.ObjectColor,
                                Latitude = mes.Coordinates.First().Latitude,
                                Longitude = mes.Coordinates.First().Longitude,
                                Title = mes.Title
                            });
                        }
                    });

                return View(homeIndexViewModel);
            }
            return View();
        }
    }
}
