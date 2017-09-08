using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MapMyLuga.Models.Map
{
    public class MarkerGroup
    {
        [Key]
        public string MarkerGroupId { get; set; }
        public string GroupName { get; set; }

        public List<MessageInfo> MessageInfos { get; set; }
        public MarkerGroup()
        {
            MessageInfos = new List<MessageInfo>();
        }
    }
}
