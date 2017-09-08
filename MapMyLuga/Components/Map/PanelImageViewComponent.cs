using MapMyLuga.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MapMyLuga.Components
{
    public class PanelImageViewComponent : ViewComponent
    {

        public IViewComponentResult Invoke(MarkerMessageViewModel model, string componentName)
        {
            if (componentName == "default")
            {
                return View(model);
            }
            if(componentName == "oneImage")
            {
                return View("OneImage", model);
            }
            if(componentName == "moreImage")
            {
                return View("MoreImage", model);
            }
            if (componentName == "moreImageModal")
            {
                return View("MoreImageModal", model);
            }
            if (componentName == "oneImageModal")
            {
                return View("OneImageModal", model);
            }

            return View();
        }
    }
}
