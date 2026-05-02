import { Inngest } from "inngest";
import { supabase } from "@/lib/supabase";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

// Inngext Function to save user data to a database
export const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
    triggers: [{ event: "clerk/user.created" }],
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      image_url: image_url,
    };
    
    const { error } = await supabase.from('users').upsert(userData);
    if (error) throw new Error(error.message);
  }
);

// Inngest Function to update user data in database
export const syncUserUpdation = inngest.createFunction(
  {
    id: "update-user-from-clerk",
    triggers: [{ event: "clerk/user.updated" }],
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      image_url: image_url,
    };
    
    const { error } = await supabase.from('users').update(userData).eq('id', id);
    if (error) throw new Error(error.message);
  }
);

// Inngest Function to delete user data from database
export const syncUserDeletion = inngest.createFunction(
  {
    id: "delete-user-from-clerk",
    triggers: [{ event: "clerk/user.deleted" }],
  },
  async ({ event }) => {
    const { id } = event.data;

    const { error } = await supabase.from('users').delete().eq('id', id);
    if (error) throw new Error(error.message);
  }
);

// Inngest Function to create user's order in database
export const createUserOrder = inngest.createFunction(
  {
    id: "create-user-order",
    batchEvents: {
      maxSize: 5,
      timeout: "5s",
    },
    triggers: [{ event: "order/created" }],
  },
  async ({ events }) => {
    const orders = events.map((event) => {
      return {
        user_id: event.data.userId,
        items: event.data.items,
        amount: event.data.amount,
        address_id: event.data.addressId, // Assuming addressId is passed
        status: 'Order Placed'
      };
    });

    const { error } = await supabase.from('orders').insert(orders);
    if (error) throw new Error(error.message);
    
    return { success: true, processed: orders.length };
  }
);
