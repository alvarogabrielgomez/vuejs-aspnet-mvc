using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace VuejsAspNet.Models
{
    public partial class TEST01 : DbContext {
        public TEST01() : base("name=TEST01")
        {
            Configuration.LazyLoadingEnabled = false;
        }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }

        public DbSet<Usuarios> Usuarios { get; set; }

    }

    public partial class TEST02 : DbContext
    {
        public TEST02() : base("name=TEST02")
        {
            Configuration.LazyLoadingEnabled = false;
        }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }

    }
}