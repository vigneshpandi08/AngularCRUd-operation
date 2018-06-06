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
    public class CityListAPIController : ApiController
    {
        private StudentEntities db = new StudentEntities();

        // GET: api/CityListAPI
        public IQueryable<CityList> GetCityLists()
        {
            return db.CityLists;
        }

        // GET: api/CityListAPI/5
        [ResponseType(typeof(CityList))]
        public IHttpActionResult GetCityList(int id)
        {
            CityList cityList = db.CityLists.Find(id);
            if (cityList == null)
            {
                return NotFound();
            }

            return Ok(cityList);
        }

        // PUT: api/CityListAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCityList(int id, CityList cityList)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != cityList.id)
            {
                return BadRequest();
            }

            db.Entry(cityList).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CityListExists(id))
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

        // POST: api/CityListAPI
        [ResponseType(typeof(CityList))]
        public IHttpActionResult PostCityList(CityList cityList)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CityLists.Add(cityList);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = cityList.id }, cityList);
        }

        // DELETE: api/CityListAPI/5
        [ResponseType(typeof(CityList))]
        public IHttpActionResult DeleteCityList(int id)
        {
            CityList cityList = db.CityLists.Find(id);
            if (cityList == null)
            {
                return NotFound();
            }

            db.CityLists.Remove(cityList);
            db.SaveChanges();

            return Ok(cityList);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CityListExists(int id)
        {
            return db.CityLists.Count(e => e.id == id) > 0;
        }
    }
}