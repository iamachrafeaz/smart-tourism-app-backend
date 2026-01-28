export const experiencesList = (experiences: any) => {
    return experiences.map((e: any) => ({
        id: e._id,
        name: e.title,
        type: e.category,
        image: e.imageUrl[0],
        rating: e.rating,
        crowdLevel: e.frequency,
        sustainable: true,
        description: e.description,
        distance: "",
        coordinates: { lng: e.location.coordinates[0], lat: e.location.coordinates[1] }
    }));
}

export const experienceDetail = (experience: any) => {
    return {
        id: experience._id,
        name: experience.title,
        type: experience.category,
        image: experience.imageUrl[0],
        tips: experience.tips,
        rating: experience.rating,
        crowdLevel: experience.frequency,
        sustainable: true,
        description: experience.description,
        distance: "",
        address: experience.address,
        accessType: experience.accessType,
        coordinates: { lng: experience.location.coordinates[0], lat: experience.location.coordinates[1] }
    }
}