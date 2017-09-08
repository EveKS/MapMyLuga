using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MapMyLuga.Models.Map
{
    public class TagToFile
    {
        [Key]
        public string TagToFileId { get; set; }

        public string TagId { get; set; }
        public Tag Tag { get; set; }

        public string FilesModelId { get; set; }
        public FilesModel FilesModel { get; set; }
    }
}
