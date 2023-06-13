using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query: IRequest<List<Activity>> { }
        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await context.Activities.ToListAsync();
            }
        }
    }
}
