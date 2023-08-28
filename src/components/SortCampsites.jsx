const SortCampsites = (props) => {
    const { sites, sortBy } = props;

    sites.sort((a, b) => a.siteNumber - b.siteNumber)

    console.log('sites', sites)

    return (
        <>
        
        </>
    )
}

export default SortCampsites