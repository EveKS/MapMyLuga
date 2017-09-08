using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MapMyLuga.Models.Map
{
    public class Tag
    {
        [Key]
        public string TagId { get; set; }
        public string Name { get; set; }
        public long UsingCount { get; set; }
        
        public List<TagToFile> TagToFile { get; set; }
        public List<TagToMessage> TagToMessage { get; set; }
        public Tag()
        {
            TagToFile = new List<TagToFile>();
            TagToMessage = new List<TagToMessage>();
        }
    }
}
