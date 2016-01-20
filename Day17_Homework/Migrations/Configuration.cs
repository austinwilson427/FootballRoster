namespace Day17_Homework.Migrations
{
    using Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Day17_Homework.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Day17_Homework.Models.ApplicationDbContext db)
        {
            var players = new Player[]
            {
                new Player {Name = "Tony Romo", Pos = "QB", Team = "Cowboys", Height= 74, Weight= 230, ImageUrl = "http://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/5209.png&w=350&h=254" },
                new Player {Name = "Jamaal Charles", Pos = "RB", Team = "Chiefs", Height= 71, Weight= 199 , ImageUrl = "http://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/11307.png&w=350&h=254"},
                new Player {Name = "Antonio Brown", Pos = "WR", Team = "Steelers", Height= 72, Weight= 195, ImageUrl = "http://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/13934.png&w=350&h=254"  },
                new Player {Name = "Rob Gronkowski", Pos = "TE", Team = "Patriots", Height= 77, Weight= 260, ImageUrl = "http://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/13229.png&w=350&h=254" }
            };

            db.Players.AddOrUpdate(p => p.Name, players);
        }
    }
}
