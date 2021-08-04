export default function filterArrays (filters, cards) {
    const allFilters = [
        filters.filterBeingTyped,
         ...filters.currentFilters
    ]
    for (const card of cards) {
        for (const filter of allFilters) {
            if (filter.length) {
                if (!card.title.includes(filter)) {
                    card.hide = true
                    continue
                } 
            }
        }
    }
    return cards
}
   
  