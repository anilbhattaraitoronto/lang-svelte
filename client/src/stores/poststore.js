import { writable, derived } from "svelte/store";

export let latestPosts = writable([]);
export let langPosts = writable([])
export let postDetail = writable ({})
export let postTitles = derived(latestPosts, ($latestPosts) => 
    $latestPosts.filter(post => {
        return {
            id: post.id,
            title: post.title,
            slug: post.slug,
            lang: post.lang,
            posted_data:post.posted_date
        }
    })
)

