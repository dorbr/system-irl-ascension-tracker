import React, { useState, useEffect } from "react";
import { useSocial } from "@/context/SocialContext";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, Trophy, CalendarCheck, Timer, User, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Event {
  id: string;
  title: string;
  description: string | null;
  event_type: string;
  start_date: string;
  end_date: string;
  status: string;
  xp_reward: number;
  participant_count?: number;
  has_joined?: boolean;
}

const EventsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetchEvents();
  }, [activeTab]);
  
  const fetchEvents = async () => {
    setIsLoading(true);
    
    try {
      const today = new Date();
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);
      
      const twoWeeksLater = new Date(today);
      twoWeeksLater.setDate(today.getDate() + 14);
      
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);
      
      const mockEvents: Event[] = [
        {
          id: "1",
          title: "Weekly Dungeon Sprint",
          description: "Complete as many dungeons as possible in one week.",
          event_type: "competition",
          start_date: today.toISOString(),
          end_date: nextWeek.toISOString(),
          status: "active",
          xp_reward: 200,
          participant_count: 15,
          has_joined: true
        },
        {
          id: "2",
          title: "Meditation Marathon",
          description: "Maintain the longest daily meditation streak.",
          event_type: "challenge",
          start_date: nextWeek.toISOString(),
          end_date: twoWeeksLater.toISOString(),
          status: "upcoming",
          xp_reward: 150,
          participant_count: 8,
          has_joined: false
        },
        {
          id: "3",
          title: "Study Champion",
          description: "Earn the most XP from study-related quests.",
          event_type: "competition",
          start_date: lastWeek.toISOString(),
          end_date: today.toISOString(),
          status: "completed",
          xp_reward: 180,
          participant_count: 12,
          has_joined: true
        }
      ];
      
      let filteredEvents;
      if (activeTab === "upcoming") {
        filteredEvents = mockEvents.filter(e => 
          e.status === "upcoming" || e.status === "active"
        );
      } else {
        filteredEvents = mockEvents.filter(e => e.status === "completed");
      }
      
      setEvents(filteredEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleJoinEvent = async (eventId: string) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, has_joined: true, participant_count: (event.participant_count || 0) + 1 } : event
    ));
  };
  
  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
  };
  
  const getEventStatusBadge = (event: Event) => {
    if (event.status === "active") {
      return <Badge className="bg-green-600">Active</Badge>;
    } else if (event.status === "upcoming") {
      return <Badge className="bg-blue-600">Upcoming</Badge>;
    } else {
      return <Badge className="bg-gray-600">Completed</Badge>;
    }
  };
  
  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "competition": return <Trophy className="h-5 w-5 text-yellow-500" />;
      case "challenge": return <CalendarCheck className="h-5 w-5 text-green-500" />;
      default: return <Calendar className="h-5 w-5 text-blue-500" />;
    }
  };
  
  const getTimeRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    
    if (now > end) return "Ended";
    
    const diffMs = end.getTime() - now.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} left`;
    }
    
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} left`;
  };
  
  const handleBack = () => {
    sessionStorage.setItem("crew-section", "social");
    navigate("/social");
  };
  
  return (
    <div className="py-4">
      <div className="mb-4 flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleBack}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Events & Competitions</h1>
      </div>
      
      <Card className="glass-card mb-4">
        <CardHeader className="pb-2">
          <CardTitle>System Events</CardTitle>
          <CardDescription>
            Special challenges and competitions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs 
            defaultValue="upcoming"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="upcoming">Active & Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="space-y-3">
              {events.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No upcoming events</p>
                </div>
              ) : (
                events.map(event => (
                  <Card key={event.id} className="overflow-hidden">
                    <div className="flex flex-col">
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <div className="mt-1">
                              {getEventTypeIcon(event.event_type)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{event.title}</h3>
                                {getEventStatusBadge(event)}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                              <div className="flex items-center text-xs gap-3">
                                <div className="flex items-center">
                                  <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                  {formatDateRange(event.start_date, event.end_date)}
                                </div>
                                <div className="flex items-center">
                                  <Timer className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                  {getTimeRemaining(event.end_date)}
                                </div>
                                <div className="flex items-center">
                                  <Users className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                  {event.participant_count} participants
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-secondary/30 p-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <Trophy className="h-4 w-4 mr-1 text-yellow-500" />
                          <span className="text-sm font-medium">Reward: {event.xp_reward} XP</span>
                        </div>
                        {event.status !== "completed" && (
                          event.has_joined ? (
                            <Badge className="bg-green-600/20 text-green-600 hover:bg-green-600/30">
                              Joined
                            </Badge>
                          ) : (
                            <Button size="sm" onClick={() => handleJoinEvent(event.id)}>
                              Join Event
                            </Button>
                          )
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </TabsContent>
            
            <TabsContent value="past" className="space-y-3">
              {events.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No past events</p>
                </div>
              ) : (
                events.map(event => (
                  <Card key={event.id} className="overflow-hidden opacity-80">
                    <div className="flex flex-col">
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <div className="mt-1">
                              {getEventTypeIcon(event.event_type)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{event.title}</h3>
                                {getEventStatusBadge(event)}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                              <div className="flex items-center text-xs gap-3">
                                <div className="flex items-center">
                                  <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                  {formatDateRange(event.start_date, event.end_date)}
                                </div>
                                <div className="flex items-center">
                                  <Users className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                  {event.participant_count} participants
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-secondary/30 p-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <Trophy className="h-4 w-4 mr-1 text-yellow-500" />
                          <span className="text-sm font-medium">Reward: {event.xp_reward} XP</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Completed
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card className="glass-card bg-muted/50">
        <CardHeader>
          <CardTitle className="text-base">About Events</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside text-sm space-y-2">
            <li>Events run for a limited time and offer special rewards</li>
            <li>Competitions pit you against other users for top rankings</li>
            <li>Challenges focus on personal growth goals</li>
            <li>All progress requires completing real-world quests</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventsPage;
