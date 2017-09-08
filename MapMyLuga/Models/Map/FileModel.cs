using MapMyLuga.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MapMyLuga.Models.Map
{
    public class FilesModel
    {
        [Key]
        public string FilesModelId { get; set; }

        public string DateAddObjectId { get; set; }
        public DateAddObject DateAddObject { get; set; }


        public List<TagToFile> TagToFile { get; set; }
        public List<User> Users { get; set; }
        public List<FileDetail> FileDetails { get; set; }
        public List<MessageInfo> MessageInfos { get; set; }
        public FilesModel()
        {
            TagToFile = new List<TagToFile>();
            Users = new List<User>();
            FileDetails = new List<FileDetail>();
            MessageInfos = new List<MessageInfo>();
        }
    }
}
