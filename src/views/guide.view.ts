
export const guideProfileView = (guideProfile: any) => {
    return {
        id: guideProfile._id,
        name: guideProfile.user.firstName + " " + guideProfile.user.lastName,
        photo: guideProfile.user.profilePictureUrl,
        languages: guideProfile.languages,
        price: guideProfile.fee,
        rating: guideProfile.rating,
        expertise: guideProfile.expertise,
        bio: guideProfile.description,
        certifications: [],
        reviews: guideProfile.reviews.map((r: any) => ({
            id: r._id,
            author: r.tourist.user.firstName + " " + r.tourist.user.lastName,
            rating: r.rating,
            date: r.createdAt,
            comment: r.description
        })),
        tours: guideProfile.tours.map((t: any) => ({
            name: t.title,
            duration: t.duration,
            price: t.duration
        })),
        availability: guideProfile.isAvailable
    }
}

export const guidesList = (guideList: any[]) => {
    return guideList.map(g => ({
        id: g._id,
        name: g.user.firstName + " " + g.user.lastName,
        photo: g.user.profilePictureUrl,
        languages: g.languages,
        price: g.fee,
        rating: g.rating,
        expertise: g.expertise,
        reviews: g.reviewsCount,
        availability: g.isAvailable
    }))
}