using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command:IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handle : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handle(DataContext context) => _context = context;            

            async Task<Unit> IRequestHandler<Command, Unit>.Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);
                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
