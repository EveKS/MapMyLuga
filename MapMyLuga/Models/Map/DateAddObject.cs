using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MapMyLuga.Models.Map
{
    public class DateAddObject
    {
        [Key]
        public string DateAddObjectId { get; set; }
        public DateTime? Date { get; set; }
        public string TimeZone { get; set; }

        public List<FilesModel> FilesModels { get; set; }
        public List<MessageInfo> MessageInfos { get; set; }
        public DateAddObject()
        {
            MessageInfos = new List<MessageInfo>();
            FilesModels = new List<FilesModel>();
        }
    }
}
