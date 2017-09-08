using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MapMyLuga.Models.Map
{
    public class Coordinate
    {
        [Key]
        public string CoordinateId { get; set; }
        public int CoordinateIndex { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }

        public string MessageInfoId { get; set; }
        public MessageInfo MessageInfo { get; set; }
    }
}
