using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MapMyLuga.Models.Map
{
    public class FileDetail
    {
        [Key]
        public string FileDetailId { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }

        public string FilesModelId { get; set; }
        public FilesModel FilesModel { get; set; }
    }
}
