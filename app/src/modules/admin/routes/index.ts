import { Elysia, t } from "elysia";
import { adminUseCases } from "../usecases";

export const adminRoutes = new Elysia({ prefix: '/admin' })
  // GET: Fetch everyone
  .get('/users', async ( {set} ) => {
    set.status = 200; 
    return adminUseCases.getData()
  }
)

  // DELETE: Delete any user or guest
  .delete('/users/:id', ({ params: { id } , set }) => {
    set.status = 200;
    return adminUseCases.removeUser({ userId: id }), 
    {
      params: t.Object({
        id: t.String()
      })
    }
    }
  );