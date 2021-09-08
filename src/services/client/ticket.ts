import Ticket from "@/entities/Ticket";
import TicketData from "@/interfaces/ticket";

export async function createNewTicket(ticket: TicketData) {
  await Ticket.saveTicket(ticket);
}

export async function findTicketById(id: number) {
  return await Ticket.findById(id);
}
