import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Post {
  id: string;
  text: string;
  author: string;
  createdAt: string;
}

export default function NewsfeedScreen() {
  const colorScheme = useColorScheme();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostText, setNewPostText] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Mock data for demonstration - replace with actual API calls
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      // Mock posts - replace with actual API call
      const mockPosts: Post[] = [
        {
          id: '1',
          text: 'Welcome to the newsfeed! This is your first post.',
          author: 'You',
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          text: 'Share your thoughts and ideas with the community!',
          author: 'Community',
          createdAt: new Date(Date.now() - 3600000).toISOString(),
        },
      ];
      setPosts(mockPosts);
    } catch (error) {
      Alert.alert('Error', 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!newPostText.trim()) {
      Alert.alert('Error', 'Please enter some text for your post');
      return;
    }

    try {
      setLoading(true);
      // TODO: Replace this with actual backend API call
      await submitPostToBackend(newPostText.trim());
      
      // Mock post creation for now - remove this when backend is connected
      const newPost: Post = {
        id: Date.now().toString(),
        text: newPostText.trim(),
        author: 'You',
        createdAt: new Date().toISOString(),
      };

      setPosts([newPost, ...posts]);
      setNewPostText('');
      // Alert.alert('Success', 'Post created successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  // TODO: Implement this function to connect to your backend
  const submitPostToBackend = async (postText: string) => {
    // This is where you'll add your backend API call
    // For now, we'll just simulate a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Submitting post to backend:', postText);
        resolve(true);
      }, 500);
    });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPosts();
    setRefreshing(false);
  };

  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Text style={styles.authorName}>{item.author}</Text>
        <Text style={styles.timestamp}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <Text style={styles.postText}>{item.text}</Text>
    </View>
  );

  return (
    <ThemedView style={styles.container} lightColor="#6a1b9a" darkColor="#6a1b9a">
      <View style={styles.header}>
        <ThemedText style={styles.title}>Newsfeed</ThemedText>
      </View>

      <KeyboardAvoidingView
        style={styles.inputContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.postInputWrapper}>
          <TextInput
            style={styles.postInput}
            placeholder="What's on your mind?"
            placeholderTextColor="#797979"
            value={newPostText}
            onChangeText={setNewPostText}
            multiline
            maxLength={500}
          />
        </View>
        <TouchableOpacity
          style={[
            styles.submitButton,
            { backgroundColor: '#fff' },
            !newPostText.trim() && styles.submitButtonDisabled,
          ]}
          onPress={handleCreatePost}
          disabled={loading || !newPostText.trim()}
        >
          <Text style={[
            styles.submitButtonText,
            { color: '#6a1b9a' }
          ]}>
            {loading ? 'Posting...' : 'Submit Post'}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        style={styles.postsList}
        contentContainerStyle={styles.postsContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="newspaper-outline" size={64} color="#fff" />
            <Text style={styles.emptyText}>No posts yet</Text>
            <Text style={styles.emptySubtext}>Be the first to share something!</Text>
          </View>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  postInputWrapper: {
    marginBottom: 15,
  },
  postInput: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    minHeight: 40,
    maxHeight: 100,
    fontSize: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    color: '#333',
  },
  submitButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  postsList: {
    flex: 1,
  },
  postsContent: {
    paddingBottom: 20,
  },
  postContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#797979',
  },
  postText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8,
  },
});
