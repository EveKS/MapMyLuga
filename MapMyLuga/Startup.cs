using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using MapMyLuga.Data;
using Microsoft.EntityFrameworkCore;
using MapMyLuga.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.ResponseCompression;
using System.IO.Compression;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Net.Http.Headers;
using Controllers.Services.File;

namespace MapMyLuga
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            #region Transient
            services.AddTransient<IFileService, FileService>();
            #endregion

            #region DB connection
            string connection = Configuration["ConnectionStrings:DefaultConnection"];
            //string connection = Configuration["ConnectionStrings:RegRu"];
            services.AddDbContext<ApplicationContext>(options =>
                options.UseSqlServer(connection));
            #endregion

            #region Identity
            services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationContext>()
                .AddDefaultTokenProviders();
            #endregion

            #region Gzip Deflate
            services.Configure<GzipCompressionProviderOptions>(options =>
                options.Level = CompressionLevel.Optimal);

            services.AddResponseCompression(options =>
            {
                options.EnableForHttps = true;
                options.MimeTypes = new[]
                {
                    // General
                    "text/plain",
                    // Static files
                    "text/css",
                    "application/javascript",
                    // MVC
                    "text/html",
                    "application/xml",
                    "text/xml",
                    "application/json",
                    "text/json",
                    // Custom
                    "image/svg+xml"
                };

                options.Providers.Add<GzipCompressionProvider>();
                //options.Providers.Add(new DeflateCompressionProvider());
            });
            #endregion

            services.AddMvc();
        }

        #region Configure
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();
            app.UseResponseCompression();
            app.UseStaticFiles(new StaticFileOptions()
            {
                OnPrepareResponse = content =>
                {
                    var time = 7 * 24 * 60 * 60;

                    content.Context.Response.Headers[HeaderNames.CacheControl] = $"public,max-age={time}";
                    content.Context.Response.Headers[HeaderNames.Expires] = DateTime.UtcNow.AddDays(7).ToString("R"); // Format RFC1123
                }
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
        #endregion
    }
}
