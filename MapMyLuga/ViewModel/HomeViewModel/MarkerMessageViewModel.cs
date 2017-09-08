using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MapMyLuga.ViewModels
{
    public class MarkerMessageViewModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string UserName { get; set; }
        public string MarkerGroupId { get; set; }
        public List<string> FilesPath { get; set; }
        public string DateAdd { get; set; }
        public string MarkerMessageId { get; set; }
        public string GroupName { get; set; }

        public MarkerMessageViewModel()
        {
            FilesPath = new List<string>();
        }
    }
}
