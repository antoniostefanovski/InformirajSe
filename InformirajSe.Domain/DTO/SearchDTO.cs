using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InformirajSe.Domain.DTO
{
    public class SearchDTO
    {
        public string keyword { get; set; } = string.Empty;

        public string order { get; set; } = string.Empty;
    }
}
