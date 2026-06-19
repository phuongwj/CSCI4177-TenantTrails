export const users = [
  { id: 1, name: 'Alex Mitchell', email: 'alex@dal.ca', password: 'password123', initials: 'AM' },
  { id: 2, name: 'James Chen', email: 'james@example.com', password: 'pass', initials: 'JC' },
];

export const apartments = [
  { id: 1, address: '1050 South Park St', name: 'Southpoint Apartments', neighbourhood: 'South End', landlord: 'Universal Realty', units: 120, built: 2008, description: 'Mid-rise apartment complex near Point Pleasant Park.', aiSummary: null, aiIssues: null, img: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=640&h=300&fit=crop' },
  { id: 2, address: '1585 Le Marchant St', name: 'Le Marchant Towers', neighbourhood: 'West End', landlord: 'Killam Properties', units: 88, built: 1975, description: 'High-rise tower in a quiet residential neighbourhood.', aiSummary: 'Tenants consistently praise the location and proximity to Quinpool Road shops. Parking availability is a recurring complaint, with multiple reviewers mentioning waitlists exceeding six months. The building shows its age in hallway carpeting and elevator reliability, but unit interiors have been progressively updated. Maintenance response times average two to three days for non-urgent requests.', aiIssues: ['Good location', 'Parking limited', 'Aging building', 'Maintenance delays'], img: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=640&h=300&fit=crop' },
  { id: 3, address: '5599 Fenwick St', name: 'Fenwick Tower', neighbourhood: 'Downtown', landlord: 'Templeton Properties', units: 314, built: 1971, description: "Halifax's tallest residential building in the downtown core.", aiSummary: 'Fenwick Tower polarises tenants. Views from upper floors are described as exceptional, and the central location is consistently praised. However, elevator outages affecting the 33-storey building appear in over half of all reviews. Security in the lobby and parking garage is another recurring concern, with several reviewers describing tailgating incidents. Rent is considered competitive for downtown Halifax.', aiIssues: ['Elevator issues', 'Great views', 'Security concerns', 'Central location', 'Competitive rent'], img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=640&h=300&fit=crop' },
  { id: 4, address: '1496 Carlton St', name: 'Park Victoria', neighbourhood: 'South End', landlord: 'Southwest Properties', units: 60, built: 2015, description: 'Modern low-rise near Victoria Park.', aiSummary: 'Park Victoria receives the highest marks in this area. Tenants describe responsive maintenance, clean common areas, and quiet neighbours. The primary complaints centre on rent increases at renewal and limited visitor parking. Multiple reviewers note the sound insulation between units is above average for Halifax.', aiIssues: ['Well maintained', 'Quiet', 'Expensive', 'Good insulation'], img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=640&h=300&fit=crop' },
  { id: 5, address: '5540 Spring Garden Rd', name: 'The Marlstone', neighbourhood: 'Spring Garden', landlord: 'Develop Nova Scotia', units: 45, built: 2024, description: 'New construction with modern amenities.', aiSummary: null, aiIssues: null, img: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=640&h=300&fit=crop' },
];

export const reviews = [
  { id: 1, aptId: 1, userId: 2, rating: 2, body: 'Cockroach problem in the kitchen that management took weeks to address. Pest control came once and the problem returned within days. I documented everything and it still took a month to get a second treatment.', date: '2026-04-18', media: ['photo'] },
  { id: 2, aptId: 1, userId: 1, rating: 3, body: 'Decent location near the park but the building has issues. Heater in my unit broke during winter and it took four days to fix. Deposit was returned in full though, which I appreciated.', date: '2026-03-10', media: [] },
  { id: 3, aptId: 1, userId: 2, rating: 2, body: 'Noise from neighbouring units is constant and management does not enforce quiet hours. Walls are thin. I would not recommend this for anyone who values sleep.', date: '2026-02-22', media: ['photo', 'photo'] },
  { id: 4, aptId: 1, userId: 1, rating: 3, body: 'Average experience overall. The laundry room is always busy and half the machines are broken. Common areas are cleaned once a week, which is not enough for a building this size.', date: '2026-01-15', media: [] },
  { id: 5, aptId: 2, userId: 2, rating: 4, body: 'Good building overall. Management is professional and responsive within 48 hours for most issues. The parking situation is genuinely bad though. I waited five months for a spot.', date: '2026-04-02', media: [] },
  { id: 6, aptId: 2, userId: 1, rating: 4, body: 'Lived here for two years. Quiet neighbours, solid construction, and the Quinpool Road location is extremely convenient. Elevator breaks down about once a month but they fix it within the day.', date: '2026-03-20', media: ['photo'] },
  { id: 7, aptId: 2, userId: 2, rating: 3, body: 'Unit was fine but the hallway carpets are stained and dated. They renovated my bathroom before I moved in, which was nice. Heat is included in rent which saves money in winter.', date: '2026-01-08', media: [] },
  { id: 8, aptId: 3, userId: 1, rating: 4, body: 'The view from the 28th floor is incredible. You can see the harbour, Dartmouth, and McNabs Island. Location is unbeatable for downtown. The trade-off is the elevators break down regularly.', date: '2026-04-12', media: ['photo', 'video'] },
  { id: 9, aptId: 3, userId: 2, rating: 2, body: 'Security in this building is a serious concern. I witnessed people following residents through the lobby door multiple times. Reported it to management and nothing changed. Also had a package stolen.', date: '2026-03-05', media: [] },
  { id: 10, aptId: 3, userId: 1, rating: 4, body: 'Rent is very reasonable for downtown Halifax. The unit itself is fine, nothing fancy but functional. Laundry facilities on every other floor. I would live here again for the price.', date: '2026-02-18', media: [] },
  { id: 11, aptId: 4, userId: 2, rating: 5, body: 'Best rental experience I have had in Halifax. Maintenance responds within hours. Building is clean, quiet, and well-managed. The only downside is rent went up 8% at renewal.', date: '2026-04-22', media: [] },
  { id: 12, aptId: 4, userId: 1, rating: 4, body: 'Modern building, everything works. Sound insulation is noticeably better than older Halifax rentals. Visitor parking is limited to two spots for the whole building.', date: '2026-03-15', media: ['photo'] },
  { id: 13, aptId: 5, userId: 2, rating: 5, body: 'Brand new building with everything you would expect. In-unit laundry, dishwasher, modern finishes. Rooftop terrace is a great touch. Rent is premium but you get what you pay for.', date: '2026-05-01', media: ['photo', 'photo'] },
];

export const comments = [
  { id: 1, reviewId: 1, userId: 1, body: 'Did you file with the tenancy board? I had a similar experience and they ruled in my favour.', date: '2026-04-20' },
  { id: 2, reviewId: 1, userId: 2, body: 'I did not, but I wish I had. By the time I considered it I was already planning to move.', date: '2026-04-21' },
  { id: 3, reviewId: 5, userId: 1, body: 'How long was the parking waitlist when you moved in?', date: '2026-04-05' },
  { id: 4, reviewId: 8, userId: 2, body: 'Which elevator bank breaks down more often? I am considering a unit on the north side.', date: '2026-04-14' },
  { id: 5, reviewId: 11, userId: 1, body: 'What was your rent before the increase? Trying to budget for a similar unit.', date: '2026-04-25' },
];

export function stars(n, max = 5) {
  return Array.from({ length: max }, (_, i) => i < Math.round(n) ? '★' : '☆').join('');
}
export function getUserById(id) { return users.find(u => u.id === id); }
export function getInitials(name) { return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2); }
export function formatDate(d) { const dt = new Date(d); return dt.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' }); }
