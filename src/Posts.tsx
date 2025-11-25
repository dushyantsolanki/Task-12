import { useQuery } from 'urql';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { EditIcon } from 'lucide-react';
import { PostEditForm } from './components/PostEditForm';

interface User {
    id: string;
    name: string;
}

export interface Post {
    id: string;
    title: string;
    body: string;
    user?: User;
}

export default function Posts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [initialData, setInitialData] = useState<Post | null>(null);

    const [{ data, fetching }] = useQuery({
        query: `
          query {
            posts(options: { paginate: { page: 1, limit: 5 } }) {
              data {
                id
                title
                body
                user {
                  id
                  name
                }
              }
            }
          }
`,
    });

    useEffect(() => {
        if (Array.isArray(data?.posts?.data) && !!data?.posts?.data?.length) {
            setPosts(data.posts.data);
        }
    }, [data]);

    return (
        <div className="flex flex-wrap p-4">
            <PostEditForm
                isOpen={!!initialData}
                onClose={() => {
                    setInitialData(null);
                }}
                initialData={initialData!}
                setPosts={setPosts}
            />
            {fetching ? (
                <div className="w-full min-h-screen flex items-center justify-center">
                    <Spinner className="h-10 w-10" />
                </div>
            ) : posts?.length > 0 ? (
                posts?.map((post: Post) => (
                    <div key={post.id} className="w-full sm:w-1/2 lg:w-1/3 p-3">
                        <Card className="h-full hover:cursor-pointer  hover:shadow-md transition-shadow duration-200">
                            <CardHeader>
                                <CardTitle className="text-lg line-clamp-1" title={post.title}>
                                    {post.title}
                                </CardTitle>
                                <p className="text-sm">
                                    By <span className="font-medium">{post.user?.name || 'Unknown User'}</span>
                                </p>
                            </CardHeader>

                            <CardContent className="md:h-16 overflow-y-auto">
                                <p className="text-sm">{post.body}</p>
                            </CardContent>

                            <CardFooter className="flex items-center justify-between text-sm border-t pt-3">
                                <div> ID: {post.id}</div>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="cursor-pointer"
                                    title="edit"
                                    onClick={() => {
                                        setInitialData(post);
                                    }}
                                >
                                    <EditIcon className="text-blue-600" />
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                ))
            ) : (
                <p className="w-full min-h-screen flex items-center justify-center font-medium sm:text-xl md:text-2xl">
                    No Data Available{' '}
                </p>
            )}
        </div>
    );
}
