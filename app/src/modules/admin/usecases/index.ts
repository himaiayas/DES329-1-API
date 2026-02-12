import { adminRepository } from "../repository";
import { UserEntry } from "../models";
import { findOneOrThrow } from "../../../db/utils";


export const adminUseCases = {
  // Fetch everyone
  getData: async () : Promise<UserEntry[]> => {
    const allUsers  = await adminRepository.fetchAll;
    return allUsers;
  },

  // Delete any user or guest
  removeUser: async ( { userId } : { userId: UserEntry["id"]  }) => {
    const result = await adminRepository.deleteById( { userId } );
    
    return findOneOrThrow(result);
  }
    
};