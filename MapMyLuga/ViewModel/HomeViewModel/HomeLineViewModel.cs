using MapMyLuga.Models.Map;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MapMyLuga.ViewModels.HomeViewModel
{
    public class HomeLineViewModel
    {
        public List<Coordinate> Coordinates { get; set; }
        public string MessageId { get; set; }
        public string Title { get; set; }
        public string ObjectColor { get; set; }
    }
}
