export const revalidate = 3600; // Revalidate every hour

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username') || 'Poojax21';

  try {
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-App',
    };

    // Add token if available for higher rate limits
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    // Fetch repos
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=30&type=owner`,
      { headers, next: { revalidate: 3600 } }
    );

    if (!reposRes.ok) {
      return Response.json({ repos: [], error: 'GitHub API unavailable' }, { status: 200 });
    }

    const repos = await reposRes.json();

    // Fetch user profile
    const profileRes = await fetch(
      `https://api.github.com/users/${username}`,
      { headers, next: { revalidate: 3600 } }
    );

    const profile = profileRes.ok ? await profileRes.json() : null;

    // Filter and format repos
    const filtered = repos
      .filter((repo) => !repo.fork && !repo.private && repo.name !== username)
      .slice(0, 10)
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        title: repo.name
          .replace(/-/g, ' ')
          .replace(/_/g, ' ')
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        description: repo.description || 'No description provided.',
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        github: repo.html_url,
        live: repo.homepage || '',
        topics: repo.topics || [],
        updatedAt: repo.updated_at,
        image: `https://opengraph.githubassets.com/1/${username}/${repo.name}`,
      }));

    return Response.json({
      repos: filtered,
      profile: profile
        ? {
            name: profile.name,
            bio: profile.bio,
            publicRepos: profile.public_repos,
            followers: profile.followers,
            following: profile.following,
            avatar: profile.avatar_url,
          }
        : null,
    });
  } catch (error) {
    console.error('GitHub API error:', error);
    return Response.json({ repos: [], error: 'Failed to fetch GitHub data' }, { status: 200 });
  }
}
