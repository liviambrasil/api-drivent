import Ticket from "@/entities/Ticket";

export async function createNewTicket(ticket: Ticket) {
  await Ticket.saveTicket(ticket);
}
