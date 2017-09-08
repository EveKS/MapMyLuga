using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MapMyLuga.Models.Map
{
    public class TagToMessage
    {
        [Key]
        public string TagToMessageId { get; set; }

        public string TagId { get; set; }
        public Tag Tag { get; set; }

        public string MessageInfoId { get; set; }
        public MessageInfo MessageInfo { get; set; }
    }
}
