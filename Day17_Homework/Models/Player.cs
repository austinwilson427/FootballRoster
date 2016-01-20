using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Day17_Homework.Models
{
    public class Player
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Team is required")]
        public string Team { get; set; }

        [Required]
        [MaxLength(2, ErrorMessage = "Pos must be 2 characters")]
        [MinLength(2, ErrorMessage = "Pos must be 2 characters")]
        public string Pos { get; set; }

        [Required]
        [Range(50,100, ErrorMessage = "Height must be between 50 and 100 inches")]
        public int Height { get; set; }

        [Required]
        [Range(100, 500, ErrorMessage = "Weight must be between 100 and 500 lbs")]
        public int Weight { get; set; }

        [Required]
        [Url(ErrorMessage = "Image link must be a URL")]
        public string ImageUrl { get; set; }
    }
}