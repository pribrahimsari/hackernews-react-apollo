import {useState} from "react";
import {gql, useMutation} from "@apollo/client";
import {useNavigate} from "react-router-dom";
import {LINKS_PER_PAGE} from "../constants";
import {FEED_QUERY} from "./LinkList";

const CREATE_LINK_MUTATION = gql`
    mutation PostMutation(
      $description: String!
      $url: String!
    ) {
      post(description: $description, url: $url) {
        id
        createdAt
        url
        description
        postedBy { id, name }      
        votes { id, user { id } }
      }
    }
`;

const CreateLink = () =>{
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    description: '',
    url: ''
  });

  const [createLink] = useMutation(CREATE_LINK_MUTATION,{
    variables: {
      description: formState.description,
      url: formState.url,
    },
    update: (cache, { data: { post } }) => {
      const take = LINKS_PER_PAGE;
      const skip = 0;
      const orderBy = { createdAt: 'desc' };

      const data = cache.readQuery({
        query: FEED_QUERY,
        variables: {
          take,
          skip,
          orderBy
        }
      });

      cache.writeQuery({
        query: FEED_QUERY,
        data: {
          feed: {
            links: [post, ...data.feed.links]
          }
        },
        variables: {
          take,
          skip,
          orderBy
        }
      });
    },
    //onCompleted: () => history.push('/new/1'),
    onCompleted: () => navigate('/'),
  });

  return(
    <div>
      <form onSubmit={event => {
        event.preventDefault();
        createLink();
      }}>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.description}
            onChange={event => setFormState({...formState, description: event.target.value})}
            type="text"
            placeholder="write link description"
          />
          <input
            className="mb2"
            value={formState.url}
            onChange={event => setFormState({...formState, url: event.target.value})}
            type="text"
            placeholder="write link URL" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateLink;