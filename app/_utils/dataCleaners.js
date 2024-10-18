export function cleanPageData(pageData, getCircularReplacer) {
    if (pageData.length) {
        return pageData.map((page) => {
            const pageOptionsJSON =
                page && page.acf && page.acf.page_options
                    ? JSON.parse(
                          JSON.stringify(
                              page.acf.page_options,
                              getCircularReplacer()
                          )
                      )
                    : [];
            if (page?.acf?.modules !== undefined) {
                return {
                    id: page.id,
                    acf: {
                        modules: page.acf.modules,
                        page_options: pageOptionsJSON,
                    },
                    title: { rendered: page.title.rendered },
                    slug: page.slug,
                    yoastMeta: page.yoast_head,
                    translatedPages: page.translated_pages,
                };
            } else {
                return [];
            }
        });
    } else {
        return [];
    }
}
export function cleanAllLocations(locations) {
    if (locations.length) {
        return locations.map((location) => {
            if (location.acf.locations_archive_content !== undefined) {
                return {
                    id: location.id,
                    slug: location.slug,
                    acf: location.acf.locations_archive_content,
                    locale: location.lang,
                };
            } else {
                return [];
            }
        });
    } else {
        return [];
    }
}

export function cleanAllPackages(packages) {
    if (packages.length) {
        return packages.map((pack) => {
            if (pack.acf.packages_archive_content !== undefined) {
                return {
                    id: pack.id,
                    slug: pack.slug,
                    acf: pack.acf.packages_archive_content,
                    locale: pack.lang,
                };
            } else {
                return [];
            }
        });
    } else {
        return [];
    }
}

export function cleanAllPosts(posts) {
    if (posts.length) {
        return posts.map((post) => {
            if (post.acf.post_archive_content !== undefined) {
                return {
                    acf: {
                        post_archive_content: post.acf.post_archive_content,
                    },
                    slug: post.slug,
                    tags: post.tags ? post.tags : [],
                    date: post.date_gmt,
                    categories: post.categories,
                    locale: post.lang,
                };
            } else {
                return [];
            }
        });
    } else {
        return [];
    }
}

export function cleanMenu(menu) {
    if (menu.length) {
        return menu.map((menuItem) => ({
            ID: menuItem.object_id,
            menuID: menuItem.ID,
            classes: menuItem.classes,
            menu_item_parent: menuItem.menu_item_parent,
            target: menuItem.target,
            title: menuItem.title,
            url: menuItem.url,
        }));
    } else {
        return [];
    }
}

export function cleanFormData(formsJSON) {
    if (formsJSON.length) {
        return formsJSON.map((formJSON) => {
            if (!formJSON.button) return null;
            return {
                button: formJSON.button,
                fields: formJSON.fields,
                id: formJSON.id,
                buttonText: formJSON.buttonText
                    ? formJSON.buttonText
                    : "Submit",
            };
        });
    } else {
        return [];
    }
}

export function cleanTaxonomy(taxonomies) {
    if (taxonomies.length) {
        return taxonomies.map((taxonomy) => ({
            id: taxonomy.id,
            name: taxonomy.name,
            slug: taxonomy.slug,
        }));
    } else {
        return [];
    }
}

export function cleanTypes(types) {
    if (Object.keys(types).length) {
        return Object.keys(types).map((type) => ({
            slug: types[type].slug,
            rest_base: types[type].rest_base,
        }));
    } else {
        return [];
    }
}

export function cleanTypePosts(posts) {
    if (posts.length) {
        const simplified_posts = posts.map((post) => ({
            slug: post.slug,
            link: post.link,
            date: post.date,
        }));
        return simplified_posts.filter((post) => {
            return !!post.link;
        });
    } else {
        return [];
    }
}

export function cleanSearchResults(results, lang = "en") {
    if (results.length) {
        return results
            .map((result) => {
                if (result !== undefined) {
                    return {
                        relevance: result.relevance,
                        answer: result.answer ?? "",
                        excerpt: result.acf?.excerpt ?? "",
                        eyebrow: result.eyebrow ?? "",
                        slug: result.slug,
                        title: result.title,
                        location: result.location,
                        type: result.type || (lang === "fr" ? "Tout" : "All"),
                        // type: result.type || "All",
                    };
                } else {
                    return [];
                }
            })
            .sort(
                (resultA, resultB) =>
                    Number(resultB.relevance) - Number(resultA.relevance)
            );
    } else {
        return [];
    }
}
