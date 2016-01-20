using Day17_Homework.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Day17_Homework.API
{
    public class PlayersController : ApiController
    {
        private ApplicationDbContext _dbresults = new ApplicationDbContext();

        // Allowing for finding all players by /api/players/
        public IHttpActionResult Get()
        {
            var players = from p in _dbresults.Players select p;
            return Ok(players);
        }

        // Allowing for finding individual players by /api/players/:id
        public IHttpActionResult get(int id)
        {
            var player = _dbresults.Players.Find(id);
            return Ok(player);
        }

        public IHttpActionResult Post(Player playerToAdd)
        {
            if (ModelState.IsValid)
            {

                //Creating a new player
                if (playerToAdd.Id == 0)
                {
                    _dbresults.Players.Add(playerToAdd);
                    _dbresults.SaveChanges();
                    return Ok();

                }
                else
                {
                    //Updating if player already exists
                    // This may work, need to check: var originalPlayer = get(playerToAdd.Id);
                    var originalPlayer = _dbresults.Players.Find(playerToAdd.Id);
                    originalPlayer.Name = playerToAdd.Name;
                    originalPlayer.Pos = playerToAdd.Pos;
                    originalPlayer.Team = playerToAdd.Team;
                    originalPlayer.Height = playerToAdd.Height;
                    originalPlayer.Weight = playerToAdd.Weight;
                    originalPlayer.ImageUrl = playerToAdd.ImageUrl;

                    _dbresults.SaveChanges();
                    return Ok(playerToAdd);
                }
            }

            //If model state is invalid
            return BadRequest(ModelState);

        }//End of Post Method

        public IHttpActionResult Delete(int id)
        {
            //Find player to delete
            // This may work, need to check: var originalPlayer = get(id);
            var playerToDelete = _dbresults.Players.Find(id);

            //Delete player
            _dbresults.Players.Remove(playerToDelete);

            _dbresults.SaveChanges();
            return Ok();
        }


    }
}
