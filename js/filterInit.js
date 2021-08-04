function startFiltering (e) {
    if (e.target.value.length > 2) {
        return e.target.value
    }
}

export { startFiltering as filterInit }