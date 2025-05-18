
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { LayoutDashboard, Users, GraduationCap, Calendar, Link2, BookText } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';
import { 
  fetchPlanningEvents, 
  PlanningEvent, 
  fetchSemesters, 
  fetchUnits, 
  fetchUnitsBySemester, 
  fetchSequences, 
  fetchSequencesByUnit,
  Semester,
  Unit,
  Sequence
} from '@/services/api';

const Planning = () => {
  const [events, setEvents] = useState<PlanningEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<PlanningEvent | null>(null);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [sequences, setSequences] = useState<Sequence[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState("calendar");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Load planning events
        const eventsData = await fetchPlanningEvents();
        setEvents(eventsData);
        
        // Load semesters
        const semestersData = await fetchSemesters();
        setSemesters(semestersData);
        
        // If we have semesters, set the first one as selected and load its units
        if (semestersData.length > 0) {
          setSelectedSemester(semestersData[0].id);
          const unitsData = await fetchUnitsBySemester(semestersData[0].id);
          setUnits(unitsData);
          
          // If we have units, set the first one as selected and load its sequences
          if (unitsData.length > 0) {
            setSelectedUnit(unitsData[0].id);
            const sequencesData = await fetchSequencesByUnit(unitsData[0].id);
            setSequences(sequencesData);
          }
        }
      } catch (error) {
        console.error("Error loading data:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les données de planification",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [toast]);

  const handleEventClick = (info: any) => {
    const clickedEvent = events.find(event => event.id === info.event.id);
    if (clickedEvent) {
      setSelectedEvent(clickedEvent);
    }
  };

  const handleDateClick = (arg: any) => {
    // Implementation for date clicking (could be used to add new events)
    console.log('Date clicked', arg.dateStr);
  };

  const handleSemesterChange = async (semesterId: string) => {
    setSelectedSemester(semesterId);
    try {
      // Load units for the selected semester
      const unitsData = await fetchUnitsBySemester(semesterId);
      setUnits(unitsData);
      
      // Reset selected unit and sequences
      setSelectedUnit(null);
      setSequences([]);
      
      // If we have units, set the first one as selected and load its sequences
      if (unitsData.length > 0) {
        setSelectedUnit(unitsData[0].id);
        const sequencesData = await fetchSequencesByUnit(unitsData[0].id);
        setSequences(sequencesData);
      }
    } catch (error) {
      console.error("Error loading units:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les unités",
        variant: "destructive"
      });
    }
  };

  const handleUnitChange = async (unitId: string) => {
    setSelectedUnit(unitId);
    try {
      // Load sequences for the selected unit
      const sequencesData = await fetchSequencesByUnit(unitId);
      setSequences(sequencesData);
    } catch (error) {
      console.error("Error loading sequences:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les séquences",
        variant: "destructive"
      });
    }
  };

  // Navigation items for the sidebar
  const navItems = [
    { title: "Tableau de bord", id: "dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { title: "Étudiants", id: "students", icon: Users, path: "/students" },
    { title: "Classes", id: "classes", icon: GraduationCap, path: "/classes" },
    { title: "Planning", id: "planning", icon: Calendar, path: "/planning" },
    { title: "Affectations", id: "affectation", icon: Link2, path: "/affectation" },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Chargement du planning...</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex w-full">
        {/* Sidebar Navigation */}
        <Sidebar className="border-r">
          <SidebarContent>
            <div className="py-4 px-5">
              <div className="flex items-center space-x-3">
                <button className="flex items-center focus:outline-none text-2xl font-bold">
                  <span className="text-black">اونلاين</span> <span className="text-yellow-500">قسمي</span>
                </button>
                <img 
                  src="/graduation-cap-svg-icon-free-graduation-cap-icon-11553393846gq7rcr1qsx.png" 
                  alt="Graduation Cap Icon" 
                  className="w-14 h-14 rounded-full shadow-lg border-2 border-yellow-500"
                />
              </div>
            </div>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        className={location.pathname === item.path ? "bg-accent" : ""}
                        onClick={() => navigate(item.path)}
                      >
                        <item.icon className="h-5 w-5 mr-2" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Planning</h1>
              
              <div className="flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10 border-2 border-primary">
                        <AvatarImage src="" alt="Teacher" />
                        <AvatarFallback>KB</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Kaoutar Boudouft</p>
                        <p className="text-xs leading-none text-muted-foreground">kb@qismi.ma</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => console.log('Profile settings')}>
                      Profil
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/')}>
                      Déconnexion
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          <main className="p-6">
            <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="calendar">Calendrier</TabsTrigger>
                  <TabsTrigger value="structure">Structure pédagogique</TabsTrigger>
                </TabsList>
                
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Ajouter un événement</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Ajouter un événement</DialogTitle>
                        <DialogDescription>
                          Créez un nouvel événement dans le calendrier.
                        </DialogDescription>
                      </DialogHeader>
                      {/* Event creation form would go here */}
                      <div className="py-4">
                        <p>Formulaire d'ajout d'événement à implémenter.</p>
                      </div>
                      <div className="flex justify-end">
                        <DialogClose asChild>
                          <Button variant="outline" className="mr-2">Annuler</Button>
                        </DialogClose>
                        <Button>Enregistrer</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button variant="outline" onClick={() => navigate('/generate-diagnostique-Test')}>
                    Test Diagnostique
                  </Button>
                </div>
              </div>

              <TabsContent value="calendar" className="mt-2">
                <Card>
                  <CardContent className="pt-6">
                    <FullCalendar
                      plugins={[dayGridPlugin, interactionPlugin]}
                      initialView="dayGridMonth"
                      events={events}
                      eventClick={handleEventClick}
                      dateClick={handleDateClick}
                      height="auto"
                      headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,dayGridWeek,dayGridDay'
                      }}
                      buttonText={{
                        today: "Aujourd'hui",
                        month: 'Mois',
                        week: 'Semaine',
                        day: 'Jour'
                      }}
                      locale="fr"
                    />
                  </CardContent>
                </Card>

                {selectedEvent && (
                  <Dialog open={!!selectedEvent} onOpenChange={open => !open && setSelectedEvent(null)}>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>{selectedEvent.title}</DialogTitle>
                        <DialogDescription>
                          Détails de l'événement
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4 space-y-3">
                        <div className="flex justify-between">
                          <span className="font-medium">Date:</span>
                          <span>
                            {new Date(selectedEvent.start).toLocaleDateString('fr-FR', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                        {selectedEvent.classe && (
                          <div className="flex justify-between">
                            <span className="font-medium">Classe:</span>
                            <span>{selectedEvent.classe}</span>
                          </div>
                        )}
                        {selectedEvent.level && (
                          <div className="flex justify-between">
                            <span className="font-medium">Niveau:</span>
                            <span>{selectedEvent.level}</span>
                          </div>
                        )}
                        {selectedEvent.location && (
                          <div className="flex justify-between">
                            <span className="font-medium">Lieu:</span>
                            <span>{selectedEvent.location}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="font-medium">Type:</span>
                          <Badge style={{ backgroundColor: selectedEvent.color }}>
                            {selectedEvent.type}
                          </Badge>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </TabsContent>

              <TabsContent value="structure" className="mt-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Semesters Column */}
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-medium mb-4">Semestres</h3>
                      <div className="space-y-3">
                        {semesters.map((semester) => (
                          <div 
                            key={semester.id}
                            className={`p-3 rounded-md cursor-pointer border ${
                              selectedSemester === semester.id 
                                ? 'bg-primary/10 border-primary' 
                                : 'hover:bg-accent'
                            }`}
                            onClick={() => handleSemesterChange(semester.id)}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{semester.name}</span>
                              <Badge variant={semester.status === "en cours" ? "default" : "outline"}>
                                {semester.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {new Date(semester.startDate).toLocaleDateString('fr-FR')} - {new Date(semester.endDate).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        ))}
                        
                        {semesters.length === 0 && (
                          <p className="text-muted-foreground text-center py-4">
                            Aucun semestre disponible
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Units Column */}
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-medium mb-4">Unités</h3>
                      <div className="space-y-3">
                        {units.map((unit) => (
                          <div 
                            key={unit.id}
                            className={`p-3 rounded-md cursor-pointer border ${
                              selectedUnit === unit.id 
                                ? 'bg-primary/10 border-primary' 
                                : 'hover:bg-accent'
                            }`}
                            onClick={() => handleUnitChange(unit.id)}
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <span className="mr-2">{unit.emoji}</span>
                                <span className="font-medium">{unit.name}</span>
                              </div>
                              <Badge 
                                style={{ backgroundColor: unit.color }}
                                variant={unit.status === "en cours" ? "default" : "outline"}
                              >
                                {unit.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {unit.description}
                            </p>
                            <div className="mt-2 w-full bg-secondary rounded-full h-2">
                              <div 
                                className="rounded-full h-2" 
                                style={{ width: `${unit.progress}%`, backgroundColor: unit.color }} 
                              />
                            </div>
                          </div>
                        ))}
                        
                        {units.length === 0 && (
                          <p className="text-muted-foreground text-center py-4">
                            Sélectionnez un semestre pour voir ses unités
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Sequences Column */}
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-medium mb-4">Séquences</h3>
                      <div className="space-y-3">
                        {sequences.map((sequence) => (
                          <div 
                            key={sequence.id}
                            className="p-3 rounded-md border hover:bg-accent"
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{sequence.name}</span>
                              <span className="text-sm text-muted-foreground">
                                {sequence.progress}%
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {sequence.description}
                            </p>
                            <div className="mt-2 w-full bg-secondary rounded-full h-2">
                              <div 
                                className="bg-primary rounded-full h-2" 
                                style={{ width: `${sequence.progress}%` }} 
                              />
                            </div>
                          </div>
                        ))}
                        
                        {sequences.length === 0 && (
                          <p className="text-muted-foreground text-center py-4">
                            Sélectionnez une unité pour voir ses séquences
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Planning;
