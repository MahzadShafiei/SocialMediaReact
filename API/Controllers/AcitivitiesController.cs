using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class AcitivitiesController : BaseApiController
{

    public AcitivitiesController(IMediator mediator) { }


    [HttpGet] //api/activities
    public async Task<ActionResult<List<Activity>>> GetActivities() => await Mediator.Send(new List.Query());


    [HttpGet("{id}")] //api/activities/klhjnikhni
    public async Task<ActionResult<Activity?>> GetActivity(Guid id) => await Mediator.Send(new Details.Query { Id = id });

    [HttpPost]
    public async Task<IActionResult> CreateActivity(Activity activity) => Ok(await Mediator.Send(new Create.Command { Activity = activity }));

}
