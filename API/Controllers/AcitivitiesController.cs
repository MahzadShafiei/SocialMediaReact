using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class AcitivitiesController : BaseApiController
{
    private readonly IMediator mediator;

    public AcitivitiesController(IMediator mediator) => this.mediator = mediator;


    [HttpGet] //api/activities
    public async Task<ActionResult<List<Activity>>> GetActivities() => await mediator.Send(new List.Query());
    

    [HttpGet("{id}")] //api/activities/klhjnikhni
    public async Task<ActionResult<Activity?>> GetActivity(Guid id) => Ok();
}
