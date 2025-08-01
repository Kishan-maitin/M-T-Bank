import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { X, Loader2, Search } from "lucide-react";
import { Person, searchPeople } from "@/apis/commonApiCalls/searchApi";
import { useApiCall } from "@/apis/globalCatchError";
import { fetchFollowings } from "@/apis/commonApiCalls/activityApi";
import { Avatar } from "@/components/ui/avatar";
import { TruncatedText } from "../ui/TruncatedText";
interface SelectedUser {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  profilePic: string;
}

interface SelectFriendsTabProps {
  selectedParticipants: string[];
  onParticipantsChange: (participants: string[]) => void;
}

const SelectFriendsTab: React.FC<SelectFriendsTabProps> = ({
  selectedParticipants,
  onParticipantsChange,
}) => {
  const currentUserId = localStorage.getItem("userId") || "";
  const [searchQuery, setSearchQuery] = useState("");
  const [followings, setFollowings] = useState<Person[]>([]);
  const [searchResults, setSearchResults] = useState<Person[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<SelectedUser[]>([]);

  const [executeSearch, isSearching] = useApiCall(searchPeople);
  const [executeFetchFollowings, isLoadingFollowings] =
    useApiCall(fetchFollowings);

  useEffect(() => {
    const loadFollowings = async () => {
      const result = await executeFetchFollowings();
      if (result.success && result.data?.users) {
        const filteredFollowings = result.data.users.filter(
          (user) => user.id !== currentUserId
        );
        setFollowings(filteredFollowings);
      }
    };
    loadFollowings();
  }, [currentUserId]);

  useEffect(() => {
    const searchUsers = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      const result = await executeSearch(searchQuery);
      if (result.success && result.data?.users) {
        const filteredResults = result.data.users.filter(
          (user) => user.id !== currentUserId
        );
        setSearchResults(filteredResults);
      }
    };

    const timeoutId = setTimeout(searchUsers, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, currentUserId]);

  const toggleUserSelection = (user: Person) => {
    if (user.id === currentUserId) return;

    const isCurrentlySelected = selectedParticipants.includes(user.id);

    if (isCurrentlySelected) {
      // Remove user
      onParticipantsChange(selectedParticipants.filter((id) => id !== user.id));
      setSelectedUsers((prev) => prev.filter((u) => u.id !== user.id));
      console.log("selectedUsers: ", selectedUsers);
    } else {
      // Add user
      const newUser = {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        bio: user.bio,
        profilePic: user.profilePic || user.avatar,
      };
      onParticipantsChange([...selectedParticipants, user.id]);
      setSelectedUsers((prev) => [...prev, newUser]);
      console.log("selectedUsers: ", selectedUsers);
    }
  };

  const removeSelectedUser = (userId: string) => {
    onParticipantsChange(selectedParticipants.filter((id) => id !== userId));
    setSelectedUsers((users) => users.filter((user) => user.id !== userId));
    console.log("selectedUsers: ", selectedUsers);
  };

  const displayUsers = searchQuery.trim()
    ? searchResults // Don't filter selected users from search results
    : followings.filter((user) => !selectedParticipants.includes(user.id)); // Only filter from followings list

  const isUserSelected = (userId: string) =>
    selectedParticipants.includes(userId);

  return (
    <div className="space-y-6 max-h-[50vh] overflow-y-auto">
      <h2 className="text-xl font-medium mb-4">Invite Friends to Your Group</h2>
      <div className="mb-4 relative">
        <Input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10"
        />
        {isSearching ? (
          <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
        ) : (
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        )}
      </div>

      {/* Selected Users Section - Only show when not searching */}
      {selectedUsers.length > 0 && !searchQuery.trim() && (
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Selected Friends</h3>
          <div className="space-y-3">
            {selectedUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                isSelected={true}
                onToggle={() => removeSelectedUser(user.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Users/Search Results Section */}
      <div className="space-y-3">
        {isLoadingFollowings ? (
          <div className="flex justify-center py-4">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : (
          displayUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              isSelected={isUserSelected(user.id)}
              onToggle={() => toggleUserSelection(user)}
            />
          ))
        )}
      </div>
    </div>
  );
};

interface UserCardProps {
  user: Person | SelectedUser;
  isSelected: boolean;
  onToggle: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, isSelected, onToggle }) => (
  <div
    className={`flex items-center justify-between p-3 border rounded-lg hover:bg-accent relative ${
      isSelected ? "border-primary border-2" : "border-border"
    }`}
  >
    <div className="flex items-center space-x-3">
      <Avatar className="h-12 w-12">
        <img
          src={user.profilePic || user.avatar}
          alt={user.name}
          className="h-12 w-12 rounded-full"
        />
      </Avatar>
      <div>
        <h3 className="font-medium">{user.name}</h3>
        <TruncatedText
          text={user.bio}
          limit={50}
          showToggle={false}
          className="text-sm text-muted-foreground"
        />
      </div>
    </div>
    <Button
      variant={isSelected ? "destructive" : "outline"}
      onClick={onToggle}
      size="sm"
      className="cursor-pointer"
    >
      {isSelected ? <X className="h-4 w-4" /> : "Add"}
    </Button>
  </div>
);

export default SelectFriendsTab;
