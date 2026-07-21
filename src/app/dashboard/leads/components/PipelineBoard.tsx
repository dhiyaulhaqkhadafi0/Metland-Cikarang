"use client";

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { updateLeadStatus } from '@/app/actions/lead-management.actions';
import { Card } from '@/components/ui/Card';
import { Phone, Clock } from 'lucide-react';
import Link from 'next/link';

// Pipeline stages (Harus sesuai dengan status database)
const STAGES = ['New', 'Contacted', 'Survey', 'Negotiation', 'Booked', 'Closing', 'Lost'];

export default function PipelineBoard({ initialLeads }: { initialLeads: any[] }) {
  const [columns, setColumns] = useState<Record<string, any[]>>({});
  const [isClient, setIsClient] = useState(false);
  
  // Mengatasi masalah hydration mismatch di Next.js dengan pustaka DND
  useEffect(() => {
    setIsClient(true);
    const cols: Record<string, any[]> = {};
    STAGES.forEach(stage => cols[stage] = []);
    
    initialLeads.forEach(lead => {
      const status = STAGES.includes(lead.status) ? lead.status : 'New';
      cols[status].push(lead);
    });
    setColumns(cols);
  }, [initialLeads]);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    const newCols = { ...columns };
    const [movedLead] = newCols[sourceCol].splice(source.index, 1);
    
    // Update state React (UI Optimistic) agar instan
    movedLead.status = destCol;
    newCols[destCol].splice(destination.index, 0, movedLead);
    setColumns(newCols);

    // Update di Database via Server Action (termasuk catat history ke Timeline)
    if (sourceCol !== destCol) {
      await updateLeadStatus(draggableId, destCol);
    }
  };

  const getStageColor = (stage: string) => {
    switch(stage) {
      case 'New': return 'border-blue-500';
      case 'Contacted': return 'border-yellow-500';
      case 'Survey': return 'border-purple-500';
      case 'Negotiation': return 'border-orange-500';
      case 'Booked': return 'border-emerald-400';
      case 'Closing': return 'border-green-500';
      case 'Lost': return 'border-red-500';
      default: return 'border-slate-500';
    }
  };

  if (!isClient || Object.keys(columns).length === 0) return null;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4 h-[calc(100vh-250px)] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {STAGES.map(stage => (
          <div key={stage} className="flex-shrink-0 w-[300px] bg-[#0f151c] border border-white/5 rounded-xl flex flex-col shadow-lg">
            <div className={`p-4 border-t-4 ${getStageColor(stage)} rounded-t-xl bg-white/[0.02]`}>
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-white">{stage}</h3>
                <span className="text-xs font-bold text-slate-400 bg-white/10 px-2 py-0.5 rounded-full">
                  {columns[stage]?.length || 0}
                </span>
              </div>
            </div>
            
            <Droppable droppableId={stage}>
              {(provided, snapshot) => (
                <div 
                  ref={provided.innerRef} 
                  {...provided.droppableProps}
                  className={`flex-1 p-3 overflow-y-auto space-y-3 transition-colors ${snapshot.isDraggingOver ? 'bg-white/5' : ''}`}
                >
                  {columns[stage]?.map((lead, index) => (
                    <Draggable key={lead.id} draggableId={lead.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? 0.8 : 1,
                            transform: snapshot.isDragging 
                               ? provided.draggableProps.style?.transform 
                               : "translate(0px, 0px)"
                          }}
                        >
                          <Link href={`/dashboard/leads/${lead.id}`}>
                            <Card className="p-4 bg-[#141b25] hover:bg-[#1a2330] transition-colors border border-white/10 shadow-lg group cursor-grab active:cursor-grabbing">
                              <div className="flex justify-between items-start mb-2">
                                <div className="font-semibold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                                  {lead.name || <span className="text-slate-500 italic">Belum Ada Nama</span>}
                                </div>
                              </div>
                              <div className="space-y-1.5 mt-3">
                                {lead.phone && (
                                  <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <Phone size={12} />
                                    {lead.phone}
                                  </div>
                                )}
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                  <Clock size={12} />
                                  {new Date(lead.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                </div>
                              </div>
                              <div className="mt-3 pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
                                <span className="text-[10px] px-2 py-0.5 bg-white/5 text-slate-300 rounded border border-white/10">
                                  {lead.utm_source || 'Organic'}
                                </span>
                                {lead.interest_cluster && (
                                  <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">
                                    {lead.interest_cluster}
                                  </span>
                                )}
                              </div>
                            </Card>
                          </Link>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}
