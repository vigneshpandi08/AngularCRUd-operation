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
    public class QualificationInfoAPIController : ApiController
    {
        private StudentEntities db = new StudentEntities();

        // GET: api/QualificationInfoAPI
        public IQueryable<qualification> Getqualifications()
        {
            return db.qualifications;
        }

        // GET: api/QualificationInfoAPI/5
        [ResponseType(typeof(qualification))]
        public IHttpActionResult Getqualification(int id)
        {
            qualification qualification = db.qualifications.Find(id);
            if (qualification == null)
            {
                return NotFound();
            }

            return Ok(qualification);
        }

        // PUT: api/QualificationInfoAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putqualification(int id, qualification qualification)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != qualification.Qid)
            {
                return BadRequest();
            }

            db.Entry(qualification).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!qualificationExists(id))
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

        // POST: api/QualificationInfoAPI
        [ResponseType(typeof(qualification))]
        public IHttpActionResult Postqualification(qualification qualification)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.qualifications.Add(qualification);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = qualification.Qid }, qualification);
        }

        // DELETE: api/QualificationInfoAPI/5
        [ResponseType(typeof(qualification))]
        public IHttpActionResult Deletequalification(int id)
        {
            qualification qualification = db.qualifications.Find(id);
            if (qualification == null)
            {
                return NotFound();
            }

            db.qualifications.Remove(qualification);
            db.SaveChanges();

            return Ok(qualification);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool qualificationExists(int id)
        {
            return db.qualifications.Count(e => e.Qid == id) > 0;
        }
    }
}