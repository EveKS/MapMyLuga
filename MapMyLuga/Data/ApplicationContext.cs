using MapMyLuga.Models;
using MapMyLuga.Models.Map;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MapMyLuga.Data
{
    public class ApplicationContext : IdentityDbContext<User>
    {
        public DbSet<MarkerGroup> MarkerGroups { get; set; }
        public DbSet<MessageInfo> MessageInfos { get; set; }
        public DbSet<FileDetail> FileDetails { get; set; }
        public DbSet<FilesModel> FilesModels { get; set; }
        public DbSet<DateAddObject> DateAddObjects { get; set; }
        public DbSet<Coordinate> Coordinates { get; set; }
        public DbSet<Tag> Tags { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TagToFile>().HasKey(k => new { k.TagId, k.FilesModelId });

            modelBuilder.Entity<TagToFile>()
                .HasOne(x => x.Tag)
                .WithMany(x => x.TagToFile)
                .HasForeignKey(x => x.TagId);

            modelBuilder.Entity<TagToFile>()
               .HasOne(x => x.FilesModel)
               .WithMany(x => x.TagToFile)
               .HasForeignKey(x => x.FilesModelId);

            modelBuilder.Entity<TagToMessage>().HasKey(k => new { k.TagId, k.MessageInfoId });

            modelBuilder.Entity<TagToMessage>()
                .HasOne(x => x.Tag)
                .WithMany(x => x.TagToMessage)
                .HasForeignKey(x => x.TagId);

            modelBuilder.Entity<TagToMessage>()
               .HasOne(x => x.MessageInfo)
               .WithMany(x => x.TagToMessage)
               .HasForeignKey(x => x.MessageInfoId);

            base.OnModelCreating(modelBuilder);
        }
    }
}
