using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Crud_operation.Models;

namespace Crud_operation.Controllers
{
    public class HobbyInfoAPIController : ApiController
    {
        private StudentEntities db = new StudentEntities();

        // GET: api/HobbyInfoAPI
        public IQueryable<hobby> Gethobbies()
        {
            return db.hobbies;
        }

        // GET: api/HobbyInfoAPI/5
        [ResponseType(typeof(hobby))]
        public IHttpActionResult Gethobby(int id)
        {
            hobby hobby = db.hobbies.Find(id);
            if (hobby == null)
            {
                return NotFound();
            }

            return Ok(hobby);
        }

        // PUT: api/HobbyInfoAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Puthobby(int id, hobby hobby)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != hobby.id)
            {
                return BadRequest();
            }

            db.Entry(hobby).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!hobbyExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/HobbyInfoAPI
        [ResponseType(typeof(hobby))]
        public IHttpActionResult Posthobby(hobby hobby)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.hobbies.Add(hobby);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = hobby.id }, hobby);
        }

        // DELETE: api/HobbyInfoAPI/5
        [ResponseType(typeof(hobby))]
        public IHttpActionResult Deletehobby(int id)
        {
            hobby hobby = db.hobbies.Find(id);
            if (hobby == null)
            {
                return NotFound();
            }

            db.hobbies.Remove(hobby);
            db.SaveChanges();

            return Ok(hobby);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool hobbyExists(int id)
        {
            return db.hobbies.Count(e => e.id == id) > 0;
        }
    }
}