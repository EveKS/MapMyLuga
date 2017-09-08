using MapMyLuga.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MapMyLuga.Models.Map
{
    public class MessageInfo
    {
        [Key]
        public string MessageInfoId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ObjectColor { get; set; }
        public bool IsLine { get; set; }

        public string MarkerGroupId { get; set; }
        public MarkerGroup MarkerGroup { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }

        public string FilesModelId { get; set; }
        public FilesModel FilesModel { get; set; }

        public string DateAddObjectId { get; set; }
        public DateAddObject DateAddObject { get; set; }

        public List<TagToMessage> TagToMessage { get; set; }
        public List<Coordinate> Coordinates { get; set; }
        public MessageInfo()
        {
            TagToMessage = new List<TagToMessage>();
            Coordinates = new List<Coordinate>();
        }
    }
}
