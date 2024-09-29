using Microsoft.EntityFrameworkCore;
using DAL.Models;
using DAL;
using BL;
using DAL.Repositories;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("LevTovConnection")));

builder.Services.AddScoped<RoomService>();
builder.Services.AddScoped<RoomRepository>();


builder.Services.AddScoped<HelloWorldService>();
builder.Services.AddScoped<HelloWorldRepository>();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
