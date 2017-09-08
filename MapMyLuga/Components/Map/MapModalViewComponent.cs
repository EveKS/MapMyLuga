using MapMyLuga.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MapMyLuga.Components.Map
{
    public class MapModalViewComponent : ViewComponent
    {

        public IViewComponentResult Invoke(MarkerModel model, string componentName)
        {
            if (componentName == "line")
            {
                return View("LineModal");
            }

            return View();
        }        
    }
}
