using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class AcitivitiesController : BaseApiController
{
    private readonly DataContext context;

    public AcitivitiesController(DataContext context) => this.context = context;

    [HttpGet] //api/activities
    public async Task<ActionResult<List<Activity>>> GetActivities() => await context.Activities.ToListAsync();

    [HttpGet("{id}")] //api/activities/klhjnikhni
    public async Task<ActionResult<Activity?>> GetActivity(Guid id) => await context.Activities.FindAsync(id); 
}
