class TeamCreateEmail {
  email!: string;
}

class TeamCreate {
  name: string | null = null;
  emails: TeamCreateEmail[] | null = [];
}

export {
  TeamCreateEmail,
  TeamCreate,
};